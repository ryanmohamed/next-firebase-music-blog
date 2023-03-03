export default function DropDownMenu(props) {
    return (
        <div className="dropdown">
            {props && props.children}
        </div>
    )
}