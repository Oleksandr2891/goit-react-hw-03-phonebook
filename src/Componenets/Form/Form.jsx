import { FormWrapper } from "./FormStyled";
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class Form extends Component {
    state = {
        name: '',
        number: ''
    }

    handleChangeInput = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value })
    }


    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit({ ...this.state, id: uuidv4() });
        this.reset();
    }

    reset = () => {
        this.setState({ name: '', number: '' })
    }

    render() {
        const { name, number } = this.state;

        return (

            <FormWrapper onSubmit={this.handleSubmit}>
                <label>
                    Name
                    <input
                        className="input"
                        onChange={this.handleChangeInput}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        value={name}
                        required
                    />
                </label>
                <label>
                    Number
                    <input
                        className="input"
                        onChange={this.handleChangeInput}
                        value={number}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                    />
                </label>
                <button type="submit" className="buttonSubmit">Add contact</button>
            </FormWrapper>


        );
    }
}

export default Form