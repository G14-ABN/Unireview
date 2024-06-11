export {login}
import React, { useEffect, useState } from 'react';
import GoogleLoginComponent from './component';
import UserProfile from './userProfile';
import { Modal , Button} from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode}  from 'jwt-decode';
interface User {
  email: string;
  nomeUtente: string;
}

function login(){

  const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

  async function logIn(){
    async function fetch() : Promise <any>{        
      return new Promise((resolve, rejects)=>{
              /*const XMLHttpRequest = require('xhr2');
              const xhr = new XMLHttpRequest();
              xhr.open('POST', 'http://localhost:8080/auth/google/callback', true);
              xhr.onreadystatechange = ()=>{ 
                  if (xhr.readyState === XMLHttpRequest.DONE) {
                      if (xhr.status === 200) {        
                          const resp = JSON.parse(xhr.responseText);
                      if (resp != undefined){
                          resolve(resp)
                          console.log(resp)
                      } else {
                          rejects('Error fetching exams:'+ xhr.status + xhr.statusText);
                      }
                      }
                  };
              }
              xhr.send()*/
              const token = localStorage.getItem('jwtToken');
              if (token) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:8080/auth/google/callback', true);
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    console.log(response);
                    resolve(response)
                  } else if (xhr.readyState === 4) {
                    console.error('Error fetching user data:', xhr.statusText);
                    rejects(xhr.statusText)
                  }
                };
                xhr.send();
              }
          })
          
      }
      const temp = await fetch()
      console.log(temp);
  }
  const fetchUserData = (token: string) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/auth/test', true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response.user);
      } else if (xhr.readyState === 4) {
        console.error('Error fetching user data:', xhr.statusText);
      }
    };
    xhr.send();
  }
  return (
    <>
    <a onClick={showModal}/>
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Button href='http://localhost:8080/auth/google/callback'>
        Log In
        </Button>
        <Button onClick={()=>{
          var token = new URLSearchParams(window.location.search).get('token');
          if (token)console.log(jwtDecode(token))
        }}>
        Stampa
        </Button>
    </Modal>
    </>
  );
}