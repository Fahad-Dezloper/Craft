'use client'

import React, {
  Children,
  type CSSProperties,
  type ReactNode,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { cn } from '@/lib/utils'

type ItemRect = {
  top: number
  left: number
  width: number
  height: number
}

type GooeyGroupProps = {
  children: ReactNode
  className?: string
  itemClassName?: string
  backgroundClassName?: string
  overlap?: number
  blur?: number
  threshold?: number
  thresholdOffset?: number
}

const GooeyGroup = ({
  children,
  className,
  itemClassName,
  backgroundClassName = 'bg-red-400',
  overlap = 2,
  blur = 6,
  threshold = 18,
  thresholdOffset = -7,
}: GooeyGroupProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [rects, setRects] = useState<ItemRect[]>([])
  const childrenArray = useMemo(() => Children.toArray(children), [children])
  const rawId = useId()
  const filterId = useMemo(() => `gooey-group-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`, [rawId])

  useLayoutEffect(() => {
    const measure = () => {
      const container = contentRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const nextRects = childrenArray
        .map((_, index) => {
          const node = itemRefs.current[index]
          if (!node) return null

          const rect = node.getBoundingClientRect()
          return {
            top: rect.top - containerRect.top,
            left: rect.left - containerRect.left,
            width: rect.width,
            height: rect.height,
          }
        })
        .filter(Boolean) as ItemRect[]

      setRects(nextRects)
    }

    measure()

    const observer = new ResizeObserver(measure)
    if (contentRef.current) observer.observe(contentRef.current)
    itemRefs.current.forEach((node) => node && observer.observe(node))
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [childrenArray, overlap])

  return (
    <div className={cn('relative inline-flex flex-col items-center', className)}>
      <svg className='absolute h-0 w-0' aria-hidden='true' focusable='false'>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in='SourceGraphic' stdDeviation={blur} result='blur' />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${threshold} ${thresholdOffset}`}
              result='goo'
            />
            <feBlend in='SourceGraphic' in2='goo' />
          </filter>
        </defs>
      </svg>

      <div className='absolute inset-0 pointer-events-none' aria-hidden='true'>
        <div className='relative h-full w-full' style={{ filter: `url(#${filterId})` }}>
          {rects.map((rect, index) => {
            const pillStyle: CSSProperties = {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }

            return (
              <span
                key={`gooey-pill-${index}`}
                className={cn('absolute rounded-full', backgroundClassName)}
                style={pillStyle}
              />
            )
          })}
        </div>
      </div>

      <div ref={contentRef} className='relative z-10 flex flex-col items-center'>
        {childrenArray.map((child, index) => {
          const itemStyle: CSSProperties = index === 0 ? {} : { marginTop: -overlap }

          return (
            <div
              key={`gooey-item-${index}`}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              className={cn('relative w-fit', itemClassName)}
              style={itemStyle}
            >
              {child}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GooeyGroup
