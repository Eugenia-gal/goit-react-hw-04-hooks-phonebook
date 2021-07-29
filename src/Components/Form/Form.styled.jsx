import styled from '@emotion/styled/macro';

const CustomForm = styled.form`
  border: 2px solid black;
  border-radius: 3px;
  padding: 10px;
  width: 300px;

  & button {
    margin-top: 10px;
  }

  & label,
  input {
    display: block;
  }
`;

export default CustomForm;
