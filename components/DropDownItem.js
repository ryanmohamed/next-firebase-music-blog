import Link from "next/link";
export default function DropDownItem(props) {

    function childHandler(e){
        e.stopPropagation();
    }

    {/* when we use an a tag, we make a server request for the route
                but in using the Link component of next.js we can make a
                CLIENT-SIDE request for the route  */}

    return (
        <Link href={props.href ? props.href : 'javascript:void(0);' }>
            <a className="menu-item" onClick={ props.onClick }>
                <span className="icon-button">{props.leftIcon}</span>
                    {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        </Link>
    )
}