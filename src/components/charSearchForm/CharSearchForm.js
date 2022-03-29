import { Formik, useFormik } from "formik"
import * as Yup from 'yup';

import charSearchForm from './charSearchForm.scss'


const CharSearchForm = (props) => {

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                    .required('The character was not found. Check the name and try again')
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2))

    })

    // <div charSearchForm__wrapper>
    //     <div className="charSearchForm__finded">'There is! Visit page?'</div>
    //     <button type="submit" className="button button__main charSearchForm__btnFind">
    //             <div className="inner">To page</div>
    //     </button>
    // </div>}

    return (
        <form className="charSearchForm" onSubmit={formik.handleSubmit}>
            <label className="charSearchForm__label" htmlFor="name">Or find a character by name:</label>
            <div className="charSearchForm__wrapper">
                <input 
                    className="charSearchForm__input" 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="Enter name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                
                <button type="submit" className="button button__main charSearchForm__btn">
                        <div className="inner">Find</div>
                </button>
            </div>
            {formik.errors.name && formik.touched.name ? <div className="charSearchForm__error">{formik.errors.name}</div> : null}
          
        </form>    
    )
}
export default CharSearchForm