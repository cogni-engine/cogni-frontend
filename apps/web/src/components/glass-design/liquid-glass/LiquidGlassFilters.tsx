'use client';

/**
 * Renders hidden SVG filter definitions for liquid glass distortion.
 * Place this component once in your layout (e.g., root layout).
 *
 * Filters:
 *  - #switcher  → used by .liquid-glass CSS class (LiquidGlassCard)
 *  - #btn-glass → used by LiquidGlassButton
 */
export default function LiquidGlassFilters() {
  return (
    <svg
      aria-hidden='true'
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Card glass distortion — smooth, broad warps for large surfaces */}
        <filter
          id='switcher'
          x='-5%'
          y='-5%'
          width='110%'
          height='110%'
          filterUnits='objectBoundingBox'
        >
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.003 0.003'
            numOctaves={1}
            seed={3}
            result='turbulence'
          />
          <feGaussianBlur in='turbulence' stdDeviation={10} result='softMap' />
          <feDisplacementMap
            in='SourceGraphic'
            in2='softMap'
            scale={60}
            xChannelSelector='R'
            yChannelSelector='G'
          />
        </filter>

        {/* Button glass distortion — tighter for smaller elements */}
        <filter
          id='btn-glass'
          x='0%'
          y='0%'
          width='100%'
          height='100%'
          filterUnits='objectBoundingBox'
        >
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.02 0.02'
            numOctaves={1}
            seed={12}
            result='turbulence'
          />
          <feComponentTransfer in='turbulence' result='mapped'>
            <feFuncR type='gamma' amplitude={1} exponent={10} offset={0.5} />
            <feFuncG type='gamma' amplitude={0} exponent={1} offset={0} />
            <feFuncB type='gamma' amplitude={0} exponent={1} offset={0.5} />
          </feComponentTransfer>
          <feGaussianBlur in='turbulence' stdDeviation={2} result='softMap' />
          <feSpecularLighting
            in='softMap'
            surfaceScale={3}
            specularConstant={1}
            specularExponent={100}
            lightingColor='white'
            result='specLight'
          >
            <fePointLight x={-100} y={-100} z={200} />
          </feSpecularLighting>
          <feDisplacementMap
            in='SourceGraphic'
            in2='softMap'
            scale={80}
            xChannelSelector='R'
            yChannelSelector='G'
          />
        </filter>
      </defs>
    </svg>
  );
}
