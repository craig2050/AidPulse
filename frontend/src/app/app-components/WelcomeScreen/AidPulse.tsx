import React, { forwardRef, useRef } from 'react'

import { AnimatedBeam } from '@/components/magicui/animated-beam'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; color?: string }
>(({ className, children, color }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        `z-10 flex size-12 items-center justify-center rounded-full border-2 ${
          color ? 'bg-black' : 'bg-white'
        } p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]`,
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export function AidPulse() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className='relative flex h-[300px] w-full items-center justify-center overflow-hidden pl-16 pr-16'
      ref={containerRef}
    >
      <div className='flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10'>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div1Ref}>
            <span
              className='material-symbols-outlined'
              style={{ color: 'indigo' }}
            >
              local_police
            </span>
          </Circle>
          <Circle ref={div5Ref}>
            <span
              className='material-symbols-outlined'
              style={{ color: 'darkred' }}
            >
              groups
            </span>
          </Circle>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div2Ref}>
            <span
              className='material-symbols-outlined'
              style={{ color: 'darkgoldenrod' }}
            >
              support_agent
            </span>
          </Circle>
          <Circle ref={div4Ref} className='size-16' color='black'>
            <Image
              src='/assets/whitelogo.webp'
              alt='logo'
              className='logo'
              height={60}
              width={60}
            ></Image>
          </Circle>
          <Circle ref={div6Ref}>
            <span className='material-symbols-outlined' style={{color: 'black'}}>location_city</span>
          </Circle>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div3Ref}>
            <span
              className='material-symbols-outlined'
              style={{ color: 'purple' }}
            >
              ambulance
            </span>
          </Circle>
          <Circle ref={div7Ref}>
            <span
              className='material-symbols-outlined'
              style={{ color: 'blue' }}
            >
              gavel
            </span>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div1Ref}
        curvature={75}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div2Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div3Ref}
        curvature={-75}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
        curvature={75}
        endYOffset={-7}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        delay={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        endYOffset={-10}
        startYOffset={-5}
      />
    </div>
  )
}

AidPulse.di
