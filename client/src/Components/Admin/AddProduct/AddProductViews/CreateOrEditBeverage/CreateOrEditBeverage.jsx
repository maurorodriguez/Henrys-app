import { React, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProduct,
  postBeverage,
  updateBeverage,
} from '../../../../../Redux/actions/actions';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import './CreateOrEditBeverage.css';

function CreateOrEditBeverage({ data }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const bebidas = useSelector((state) => state.products);
  const [size, setSize] = useState('');
  const [edit] = useState(isEdit());
  const [isRestore, setRestore] = useState(false);
  const [input, setInput] = useState({
    id: '',
    name: '',
    price: '',
    size: '',
    isCarbonated: '',
    isSugar: '',
    imgUri: '',
    isVeggie: '',
  });

  useEffect(() => {
    dispatch(getProduct('beverages'));
    if (edit && !isRestore) {
      setInput({
        id: data.id,
        name: data.name,
        price: data.price,
        size: data.size,
        isCarbonated: data.isCarbonated,
        isSugar: data.isSugar,
        imgUri: data.img,
        isVeggie: data.isVeggie,
      });
      setRestore(true);
    }
  }, [dispatch, edit, isRestore]);

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSize = (e) => {
    setSize(e.target.value);
  };

  function isEdit() {
    return data && Object.keys(data).length;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(updateBeverage(input));
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: `${input.name}`,
        text: 'Actualizada con exito',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659288361/logo-henrys-20x20_ftnamq.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    } else {
      dispatch(
        postBeverage({
          ...input,
          size: size,
          id: undefined,
        })
      );
      Swal.fire({
        customClass: {
          confirmButton: 'confirmBtnSwal',
        },
        title: `${input.name}`,
        text: 'Creada con exito',
        imageUrl:
          'https://res.cloudinary.com/henrysburgers/image/upload/v1659288361/logo-henrys-20x20_ftnamq.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Logo henrys',
      });
    }
    navigate('/adminproducts');
  };
  return (
    <Container>
      <div className="editBeverage__container">
        <h2>{edit ? 'Editar Bebidas' : 'Crear Bebidas'}</h2>
        <Form>
          <hr />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="beverageName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={onChange}
                type="text"
                value={input.name}
                name="name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="beveragePrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                onChange={onChange}
                type="number"
                value={input.price}
                name="price"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="uploadImgBeverage">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              onChange={onChange}
              type="url"
              name="imgUri"
              value={input.imgUri}
            ></Form.Control>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="isCarbonated">
              <Form.Label>Gasificada</Form.Label>
              <Form.Select
                onChange={onChange}
                defaultValue="Seleccionar"
                name="isCarbonated"
                value={input.isCarbonated}
              >
                <option>Seleccionar</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="IsSugar">
              <Form.Label>Tiene Azúcar</Form.Label>
              <Form.Select
                onChange={onChange}
                defaultValue="seleccionar"
                name="isSugar"
                value={input.isSugar}
              >
                <option>Seleccionar</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="size">
              <Form.Label>Tamaño</Form.Label>
              <Form.Select
                onChange={(e) => onChangeSize(e)}
                defaultValue="seleccionar"
              >
                <option>Seleccionar</option>
                <option value="Chico">Chica</option>
                <option value="Mediano">Mediana</option>
                <option value="Grande">Grande</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="isVeggie">
              <Form.Label>Vegetariano</Form.Label>
              <Form.Select
                onChange={onChange}
                defaultValue="Es Veggie"
                name="isVeggie"
                value={input.isVeggie}
              >
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Button onClick={onSubmit} variant="primary" type="submit">
            Confirmar
          </Button>
          <hr />
        </Form>
      </div>
    </Container>
  );
}

export default CreateOrEditBeverage;
