import React from "react";
import "../css/Catalogue.css";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";

function Catalogue(props) {
  var sortedProducts = props.products;

  function sortByInventory() {
    sortedProducts = props.products.sort((a, b) => {
      return a.variants[0].inventory_quantity < b.variants[0].inventory_quantity
        ? 1
        : -1;
    });
  }
  function sortByOriginalPrice() {
    sortedProducts = props.products.sort((a, b) => {
      return a.variants[0].compare_at_price > b.variants[0].compare_at_price
        ? 1
        : -1;
    });
  }
  function sortByColorGroup() {
    const red = {};
    const green = {};
    const blue = {};
    const yellow = {};
    const pink = {};
    const orange = {};
    const purple = {};
    const brown = {};
    const white = {};
    const others = {};

    props.products.map((product) => {
      if (product.title.includes("Red") || product.title.includes("Maroon")) {
        red[product.id] = product;
      } else if (product.title.includes("Green")) {
        green[product.id] = product;
      } else if (
        product.title.includes("Blue") ||
        product.title.includes("Turquoise")
      ) {
        blue[product.id] = product;
      } else if (product.title.includes("Yellow")) {
        yellow[product.id] = product;
      } else if (product.title.includes("Pink")) {
        pink[product.id] = product;
      } else if (product.title.includes("Orange")) {
        orange[product.id] = product;
      } else if (
        product.title.includes("Purple") ||
        product.title.includes("Lilac") ||
        product.title.includes("Lavender") ||
        product.title.includes("Violet")
      ) {
        purple[product.id] = product;
      } else if (product.title.includes("Brown")) {
        brown[product.id] = product;
      } else if (product.title.includes("White")) {
        white[product.id] = product;
      } else others[product.id] = product;
    });
    const colorGroup = {
      red: red,
      green: green,
      blue: blue,
      yellow: yellow,
      orange: orange,
      purple: purple,
      brown: brown,
      white: white,
      others: others,
    };
  }

  if (props.option === "color") {
    sortByColorGroup();
  } else if (props.option === "price") {
    sortByOriginalPrice();
  } else sortByInventory();
  const catalogue = sortedProducts.map((product) => {
    return (
      <Col xs="2" style={{ padding: "0px" }} key={product.id}>
        <Card>
          <Badge>Sale</Badge>
          <CardImg src={product.image.src} alt={product.image.alt} />
          <CardBody>
            <CardTitle>{product.title}</CardTitle>
            <CardText>
              <span id="compare-price">
                INR{product.variants[0].compare_at_price}
              </span>
              <span id="price">&nbsp;INR{product.variants[0].price}</span>
            </CardText>
          </CardBody>
        </Card>
      </Col>
    );
  });
  return (
    <Container>
      <Row>{catalogue}</Row>
    </Container>
  );
}

export default Catalogue;
