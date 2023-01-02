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
  Button,
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
  function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  }
  function shuffleByColor(colorGroup) {
    const test = new Array();
    shuffle(colorGroup);
    for (let i = 0; i < colorGroup.length; i++) {
      shuffle(colorGroup[i]);
    }

    for (let i = 0; i < colorGroup.length; i++) {
      for (let j = 0; j < colorGroup[i].length; j++) {
        test.push(colorGroup[i][j].product);
      }
    }
    return test;
  }
  function sortByColorGroup() {
    const red = [];
    const green = [];
    const blue = [];
    const yellow = [];
    const pink = [];
    const orange = [];
    const purple = [];
    const brown = [];
    const white = [];
    const others = [];

    props.products.map((product) => {
      if (product.title.includes("Red") || product.title.includes("Maroon")) {
        red.push({ product: product });
      } else if (product.title.includes("Green")) {
        green.push({ product: product });
      } else if (
        product.title.includes("Blue") ||
        product.title.includes("Turquoise")
      ) {
        blue.push({ product: product });
      } else if (product.title.includes("Yellow")) {
        yellow.push({ product: product });
      } else if (product.title.includes("Pink")) {
        pink.push({ product: product });
      } else if (product.title.includes("Orange")) {
        orange.push({ product: product });
      } else if (
        product.title.includes("Purple") ||
        product.title.includes("Lilac") ||
        product.title.includes("Lavender") ||
        product.title.includes("Violet")
      ) {
        purple.push({ product: product });
      } else if (product.title.includes("Brown")) {
        brown.push({ product: product });
      } else if (product.title.includes("White")) {
        white.push({ product: product });
      } else others.push({ product: product });
    });
    const colorGroup = [
      red,
      green,
      blue,
      yellow,
      pink,
      orange,
      purple,
      brown,
      white,
      others,
    ];
    sortedProducts = shuffleByColor(colorGroup);
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
            <CardImgOverlay className="d-flex">
              {product.variants[0].inventory_quantity !== 0 ? (
                <Button id="view-button" className="align-self-center mx-auto">
                  View
                </Button>
              ) : (
                <Button id="oof-button" className="align-self-center mx-auto">
                  Out of Stock
                </Button>
              )}
            </CardImgOverlay>
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
