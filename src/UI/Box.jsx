import css from './Box.module.css';

const Box = (props) => {
    return (
        <div className = {`${css.Box} ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Box;