import Layout from '../layouts/Main';
import { useForm } from "react-hook-form";
import { userLogin } from "../store/reducers/user"
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { RootState } from 'store';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

type LoginMail = {
  email: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const { user } = useSelector((state: RootState)  => state);
  useEffect(() => {
    console.log(user)
    if(user.loggedInUser.id){
      toast.success("Product added to cart successfully!");
      router.push('/')
    }
  },[]);
  const onSubmit = async (data: LoginMail) => {
    var payload = {
        username: data.email,
        password: data.password
      }
    dispatch(userLogin(payload));

  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Log in</h2>            
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  placeholder="username" 
                  type="text" 
                  name="email"
                  ref={register({ required: true })}
                />

                {errors.email && errors.email.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }

              </div>
              
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }
              </div>

              <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Sign in</button>

            </form>
          </div>

        </div>
      </section>
    </Layout>
  )
}
  
export default LoginPage
  