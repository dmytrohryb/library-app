import React from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

export function NavigationMenu(){

    const nav = (
        <>
            <Link style={{color: '#fff'}} to="/"><Button color="inherit" key={'Home'}>Home</Button></Link>
            <Link style={{color: '#fff'}} to="/news"><Button color="inherit" key={'News'}>News</Button></Link>
            <Link style={{color: '#fff'}} to="/catalog"><Button color="inherit" key={'Catalog'}>Books</Button></Link>
            <Link style={{color: '#fff'}} to="/about"><Button color="inherit" key={'About'}>About</Button></Link>
        </>
    )

    return (
        <div>
            {nav}
        </div>
    );
}
