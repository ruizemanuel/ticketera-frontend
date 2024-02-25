import React, { useEffect, useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    validateDescription,
    validateDifficulty,
    validateTitle
} from "../../../helpers/validateFields";
import { getDataToEdit, getGifs, updateData } from "../../../share/domain/appServices";
import Loader from "../../layouts/Loader";

const TicketEdit = () => {

    const { pathname } = useLocation();
    const id = pathname.split('/')[3];

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        difficultyLevel: "",
        gifUrl: "",
        isDone: 0,
    });
    const { loading, loadingGif, dataToEdit: ticket, gifs } = useSelector(state => state.app);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDataToEdit(id))
    }, [])

    useEffect(() => {
        if (ticket) {
            setInputs({
                title: ticket.title || "",
                description: ticket.description || "",
                difficultyLevel: ticket.difficultyLevel || "",
                gifUrl: ticket.gifUrl || "",
                isDone: ticket.isDone || 0,
            });
        }
    }, [ticket]);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleChangeLevel = (event) => {
        setInputs((values) => ({ ...values, difficultyLevel: event.target.value }));
        const difficultyConditions = {
            facil: () => dispatch(getGifs('easy')),
            media: () => dispatch(getGifs('so so')),
            dificil: () => dispatch(getGifs('dificil')),
        };

        const selectedDifficulty = event.target.value;

        if (selectedDifficulty && difficultyConditions[selectedDifficulty]) {
            setInputs((values) => ({ ...values, gifUrl: '' }));
            difficultyConditions[selectedDifficulty]();
        }
    };

    useEffect(() => {
        if (gifs && gifs.length > 0) {
            setInputs((values) => ({ ...values, gifUrl: gifs[Math.floor(Math.random() * gifs.length)].url }));
        }
    }, [gifs]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateTitle(inputs.title) !== 'ok') {
            Swal.fire("Error!", `${validateTitle(inputs.title)}`, "error");
            return;
        } else if (validateDescription(inputs.description) !== 'ok') {
            Swal.fire("Error!", `${validateDescription(inputs.description)}`, "error");
            return;
        } else if (validateDifficulty(inputs.difficultyLevel) !== 'ok') {
            Swal.fire("Error!", `${validateDifficulty(inputs.difficultyLevel)}`, "error");
            return;
        }

        const ticketUpdated = {
            title: inputs.title,
            description: inputs.description,
            difficultyLevel: inputs.difficultyLevel,
            gifUrl: inputs.gifUrl,
            isDone: inputs.isDone,
        };
        
        Swal.fire({
            title: "¿Estas seguro?",
            text: "No podrás revertir los cambios!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(updateData(ticketUpdated, id)).then(() => {
                    e.target.reset();
                    navigate("/");
                })


            }
        });
    };

    return (
        loading ? (<Loader />) : <div>
            <Container className="py-5">
                <h2>Modificar Ticket</h2>
                <hr />
                <Form className="my-5" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Titulo*</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Diseñar UI para JPMorgan"
                            name="title"
                            value={inputs.title || ""}
                            onChange={(e) => handleChange(e)}
                            required
                            minLength={5}
                            maxLength={50}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Descripción*</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Inserte la descripción del ticket"
                            name="description"
                            value={inputs.description || ""}
                            onChange={(e) => handleChange(e)}
                            required
                            minLength={10}
                            maxLength={200}
                            style={{ resize: "none" }} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDropdown">
                        <Form.Label>Nivel de dificultad*</Form.Label>
                        <Form.Select
                            name="difficultyLevel"
                            value={inputs.difficultyLevel || ""}
                            onChange={(e) => handleChangeLevel(e)}
                        >
                            <option value="">Selecciona un nivel de dificultad</option>
                            <option value="facil">Facil</option>
                            <option value="media">Media</option>
                            <option value="dificil">Dificil</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Estado*</Form.Label>
                        <Form.Check
                            type="checkbox"
                            label={inputs.isDone ? "Finalizado" : "Pendiente"}
                            name="isDone"
                            checked={inputs.isDone}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 text-center">
                        {loadingGif ? (
                            <p>Cargando Gif...</p>
                        ) : (
                            inputs.gifUrl ? (
                                <Image src={inputs.gifUrl} fluid />
                            ) : (
                                <p>Selecciona un nivel de dificultad para poder asignar un gif</p>
                            )
                        )}
                    </Form.Group>

                    {loading || loadingGif ? (

                        <div className="text-end">
                            <button className="btn btn-primary text-light" type="button" disabled>
                                <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                                Cargando...
                            </button>
                        </div>

                    ) : (

                        <div className="text-end">
                            <button className="btn btn-primary text-light">Guardar</button>
                        </div>

                    )}
                </Form>
            </Container>
        </div>
    );
};

export default TicketEdit;
