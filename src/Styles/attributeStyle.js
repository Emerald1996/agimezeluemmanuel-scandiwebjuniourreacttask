import styled from "styled-components";

// Product attribute active buttons
export const AttributeSizes = styled.div`
  div {
    display: flex;
    margin-top: 10px;
    width: 50%;
    font-size: 12px;
  }
`;

export const ButtonSizes = styled.button`
  color: ${(props) => (props.selected ? "#fff" : null)};
  background: ${(props) => (props.selected ? "#000" : null)};
  text-align: center;
  margin-top: -15px;
  margin: 3px;
  cursor: pointer;
  border: 1px solid "#222";
  text-transform: uppercase;
 
  padding: 8px;
  font-size: 8px;
`;
export const SelectedColor = styled.div`
padding: 10px 5px;
width: 20px;
margin: 3px;
border: 1px solid ${(props) => (props.selected ? "#5ECE7B" : "lightgray")};
cursor: pointer;
`;


// active category button
export const ListCategory = styled.li`
  list-style: none;
  border-bottom: 1px solid ${(props) => (props.active ? "#5ECE7B" : "#fff")};
  margin: 10px;
  font-weight: normal;
  font-family: sans-serif;
`;
