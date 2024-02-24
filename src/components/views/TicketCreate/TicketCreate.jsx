import React, { useEffect, useState } from "react";
import { Alert, Container, Form, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  validateDescription,
  validateDifficulty,
  validateTitle
} from "../../../helpers/validateFields";
import { createNewData, getGifs } from "../../../share/domain/appServices";

const TicketCreate = () => {


  const [inputs, setInputs] = useState({});
  const [spinner, setSpinnner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const { loading, loadingGif, gifs } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const difficultyConditions = {
      facil: () => dispatch(getGifs('easy')),
      media: () => dispatch(getGifs('so so')),
      dificil: () => dispatch(getGifs('dificil')),
    };

    const selectedDifficulty = inputs.difficultyLevel;

    if (selectedDifficulty && difficultyConditions[selectedDifficulty]) {
      setInputs((values) => ({ ...values, gifUrl: '' }));
      difficultyConditions[selectedDifficulty]();
    }
  }, [inputs.difficultyLevel]);

  useEffect(() => {
    if (gifs && gifs.length > 0) {
      setInputs((values) => ({ ...values, gifUrl: gifs[Math.floor(Math.random() * gifs.length)].url }));
    }
  }, [gifs]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


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

    const newTicket = {
      title: inputs.title,
      description: inputs.description,
      difficultyLevel: inputs.difficultyLevel,
      gifUrl: inputs.gifUrl,
      isDone: false
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
        dispatch(createNewData(newTicket)).then(() => {
          e.target.reset();
          navigate("/");
        })


      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h2>Agregar Ticket</h2>
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
              onChange={(e) => handleChange(e)}
            >
              <option value="">Selecciona un nivel de dificultad</option>
              <option value="facil">Facil</option>
              <option value="media">Media</option>
              <option value="dificil">Dificil</option>
            </Form.Select>
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


          {loading ? (

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
        {show && (
          <Alert
            key={errorMessage}
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default TicketCreate;
