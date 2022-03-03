interface Props {
    children: JSX.Element[] | JSX.Element
}

const Draggable = ({ children }: Props) => {
    return <div className="draggable">
        {children}
    </div>
}

export default Draggable;