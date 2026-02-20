import { forwardRef, type SVGProps } from "react"

export const QuarterNoteIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg ref={ref} {...props} fill='currentColor' viewBox="0 0 512 512">
        <path d="M340.078-0.004v311.078c-23.641-9.969-52.828-14.047-84.422-10.125
          c-78.516,9.75-141.969,64.594-141.766,122.407c0.203,57.875,64,96.906,142.469,87.156c78.5-9.766,141.953-64.594,141.75-122.469
          V-0.004H340.078z"/>
      </svg>
    )
  }
)
