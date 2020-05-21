import React from "react";
import {Button, Buttons} from "./styles";
import {Link} from "react-router-dom";

export default function ButtonsToManage({onEdit, onDelete, panel, id}) {
    return panel ?
        <Buttons>
            <Link to={"/admin/edit/"+id}><Button negative>Edit</Button></Link>
            <Button onClick={onDelete} negative>Delete</Button>
        </Buttons>
        :
        <Buttons>
            <Button onClick={onEdit}>Save</Button>
            <Button onClick={onDelete} negative>Cancel</Button>
        </Buttons>
}