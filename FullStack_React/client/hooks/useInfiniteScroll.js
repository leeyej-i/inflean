import { useCallback, useEffect, useRef, useState } from "react"

const useInfiniteScroll = targetEl => {

    const observerRef = useRef(null)
    const [inetersecting, setInersecting] = useState(false)
    // const observer = new IntersectionObserver(entries => setInersecting(
    //     entries.some(entry => entry.isIntersecting)
    // ))


    const getObserver = useCallback(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(entries =>
                setInersecting(entries.some(entry => entry.isIntersecting)),
            )
        }
        return observerRef.current
    }, [observerRef.current])

    useEffect(() => {
        if (targetEl.current) getObserver().observe(targetEl.current)
        return () => {
            getObserver().disconnect()
        }
    }, [targetEl.current])

    return inetersecting
}

export default useInfiniteScroll