import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({ values, touched, errors, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div>
            <Form>
                <label>
                    Name:
                    <Field type="text" name="name" />
                </label>
                {touched.name && errors.name && <p className="error">{errors.name}</p>}

                <label>
                    E-mail:
                    <Field type="text" name="email" />
                </label>
                {touched.email && errors.email && <p className="error">{errors.email}</p>}

                <label>
                    Password:
                    <Field type="text" name="password" />
                </label>
                {touched.password && errors.password && <p className="error">{errors.password}</p>}

                <label>
                    Terms of Service
                    <Field type="checkbox" name="terms" checked={values.terms} required />
                </label>

                <button type="submit">Submit!</button>
            </Form>

            {users.map(user => (
                <ul key={user.name}>
                    <li>Name: {user.name}</li>
                    <li>E-mail: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const Myform = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name must be entered!"),
        email: Yup.string().required("E-mail must be entered!"),
        password: Yup.string().required("Password must be entered!"),
        terms: Yup.string().required("Must agree to Terms of Service!")
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log(res.data);
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default Myform;