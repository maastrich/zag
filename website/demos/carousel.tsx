import * as carousel from "@zag-js/carousel"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

const items = [
  "https://tinyurl.com/5b6ka8jd",
  "https://tinyurl.com/7rmccdn5",
  "https://tinyurl.com/59jxz9uu",
  "https://tinyurl.com/6jurv23t",
  "https://tinyurl.com/yp4rfum7",
]

interface CarouselProps extends Omit<carousel.Props, "id" | "slideCount"> {}

export function Carousel(props: CarouselProps) {
  const service = useMachine(carousel.machine, {
    id: useId(),
    ...props,
    slideCount: items.length,
  })

  const api = carousel.connect(service, normalizeProps)

  return (
    <>
      <main className="carousel">
        <div {...api.getRootProps()}>
          <div {...api.getItemGroupProps()}>
            {items.map((image, index) => (
              <div {...api.getItemProps({ index })} key={index}>
                <img src={image} alt={`Slide Image ${index}`} />
              </div>
            ))}
          </div>

          <div {...api.getControlProps()}>
            <button {...api.getPrevTriggerProps()}>
              <HiChevronLeft />
            </button>
            <div {...api.getIndicatorGroupProps()}>
              {api.pageSnapPoints.map((_, index) => (
                <button key={index} {...api.getIndicatorProps({ index })} />
              ))}
            </div>
            <button {...api.getNextTriggerProps()}>
              <HiChevronRight />
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
