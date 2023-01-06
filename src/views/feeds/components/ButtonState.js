import { Button } from "react-bootstrap";

function ButtonState({state}) {
        
    const title = ["Inactivo", "Activo"];
    const variant = ['outline-danger', 'outline-success'];
    const className = ['fas fa-ban mx-1', 'fas fa-check mx-1'];

    return(
        <Button title={title[state]} className="btn-icon btn-rounded" variant={variant[state]} >
            <i className={className[state]}/>
        </Button>
    );
}

export default ButtonState;