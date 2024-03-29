import { useEffect, useRef, useState } from "react";

interface Props {
    children: JSX.Element[] | JSX.Element
}

interface PositionType {
    x: number,
    y: number
}

const Draggable = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [positionXY, setStatePositionXY] = useState<PositionType>({ x: 0, y: 0 })
    const positionRef = useRef<PositionType>(positionXY);

    const reposition = (elem: HTMLDivElement) => {
        const bound = elem.getBoundingClientRect();
        if (bound.x < 0) {
            setStatePositionXY(prev => ({ ...prev, x: prev.x - bound.x }))
        }
        if ((bound.x + bound.width) > window.innerWidth) {
            setStatePositionXY(prev => ({ ...prev, x: prev.x - (bound.x + bound.width - window.innerWidth) }))
        }
        if (bound.y < 0) {
            setStatePositionXY(prev => ({ ...prev, y: prev.y - bound.y }))
        }
        if ((bound.y + bound.height) > window.innerHeight) {
            setStatePositionXY(prev => ({ ...prev, y: prev.y - (bound.y + bound.height - window.innerHeight) }))
        }
    }

    useEffect(() => {
        if (ref.current) {
            reposition(ref.current)
        }
    }, [positionXY])

    useEffect(() => {
        const handleResize = () => {
            if (ref.current) {
                reposition(ref.current)
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return <div
        ref={ref}
        className="draggable"
        draggable="true"
        style={{
            // 첫번째 인자, 가로방향: 왼쪽에서 오른쪽으로 커지는 방향
            // 두번째 인자, 세로방향: 위에서 아래로 커지는 방향
            transform: `translate(${positionXY.x}px, ${positionXY.y}px)`
        }}
        onDragStart={(e) => {
            setTimeout(function () {
                // @ts-ignore
                e.target.style.visibility = "hidden";
            }, 1);
            positionRef.current = { x: e.clientX, y: e.clientY }
        }}
        onDragEnd={(e) => {
            // @ts-ignore
            e.target.style.visibility = "visible";
            const diffX = e.clientX - positionRef.current.x;
            const diffY = e.clientY - positionRef.current.y;
            setStatePositionXY({ x: positionXY.x + diffX, y: positionXY.y + diffY })
        }}
    >
        {children}
    </div>
}

export default Draggable;