import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { createRecord } from '../actions';
import { TimePicker, Form, Input, Button } from "antd";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 14,
            offset: 6
        }
    }
};

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
    const hasError = meta.touched && meta.invalid;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? "error" : "success"}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component {...input} {...rest} format={format} children={children} />
        </FormItem>
    );
};

const InputField = makeField(Input);
const TimeField = makeField(TimePicker);
const format = 'HH:mm:ss';

class RecordCreate extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div>
                    <div>
                        {error}
                    </div>
                </div>
            )
        }
    }

    reduxLocalStorage = () => {
        this.props.store.subscribe(() => {
            localStorage['redux-store'] = JSON.stringify(this.props.store.getState())
        })
    }

    idGenerator(list) {
        if (!list.records.length) {
            return 1;
        } else {
            return ((list.records[list.records.length - 1].id) + 1);
        }
    }

    onSubmit = (formValues, dispatch) => {
        let id = this.idGenerator(this.props.store.getState());
        this.props.createRecord(
            {
                ...formValues, phoneNumber: formValues.phoneNumber.replace(/[\s)(-]/g, '').replace("+", "00"),
                id: id,
                isChecked: false
            });

        this.reduxLocalStorage();
        dispatch(reset('createRecord'));
    }

    render() {
        const { handleSubmit, invalid, pristine, reset, submitting } = this.props;

        return (
            <div className="form__container">
                <form onSubmit={handleSubmit(this.onSubmit)}>

                    <Field
                        label="First Name"
                        name="name"
                        className="field"
                        component={InputField}
                        hasFeedback
                        placeholder="First Name"
                    />

                    <Field
                        label="Phone number"
                        name="phoneNumber"
                        component={InputField}
                        placeholder="Phone number"
                        hasFeedback />

                    <Field
                        label="Call Time"
                        name="time"
                        component={TimeField}
                        placeholder="Time"
                        hasFeedback
                        onFocus={e => e.preventDefault()}
                        onBlur={e => e.preventDefault()}
                    />
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" disabled={pristine || invalid}
                            htmlType="submit" style={{ marginRight: "10px" }}>
                            Submit
                    </Button>
                    </FormItem>
                </form>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    const phonePattern = new RegExp('^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9 ]{1,12}$');
    if (!formValues.name) {
        errors.name = 'You must enter a Name';
    }

    if (formValues.name && formValues.name.length > 30) {
        errors.name = 'Name must be max. 30 characters';
    }

    if (!formValues.phoneNumber) {
        errors.phoneNumber = 'You must enter a Phone Number';
    }

    if (formValues.phoneNumber && !formValues.phoneNumber.match(phonePattern)) {
        errors.phoneNumber = 'Incorrect format of phone number';
    }

    if (!formValues.time) {
        errors.time = 'You must enter a Time';
    }

    return errors;
}

const formWrapped = reduxForm({
    form: 'createRecord',
    validate: validate
})(RecordCreate);

export default connect(null, { createRecord: createRecord })(formWrapped);