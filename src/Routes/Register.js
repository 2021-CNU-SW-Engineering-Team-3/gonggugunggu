import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { authService, db, rt_db, storageService } from '../fbase';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, set, child, update, push } from 'firebase/database';

import unknown from '../Images/Unknown_person.jpeg';
import { v4 } from 'uuid';
import { getDownloadURL, uploadString, ref as storageRef } from 'firebase/storage';

const RegisterWrap = styled.div`
  min-height: calc(100vh - 190px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 370px;
  padding-bottom: 70px;
`;

const Logo = styled.div`
  font-size: 70px;
  font-weight: 700;
  color: black;
  margin: 30px;

  @media only screen and (max-width: 800px) {
    font-size: 50px;
  }
`;

const PhotoSelect = styled.input`
  display: none;
`;

const Avata = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-top: 40px;
  margin-bottom: 50px;

  &:hover {
    opacity: 0.6;
    transition: all ease-out 0.1s;
  }
`;

const TextField = styled.input`
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 15px;
  padding: 10px 15px;
  width: 100%;
  height: 50px;

  &:focus {
    outline: none;
    border: 1.5px solid black;
  }
`;

const Button = styled.input`
  background-color: ${({ color }) => color};
  padding: 12px 50px;
  color: white;
  justify-content: center;
  font-size: 18px;
  margin: 8px 0;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
    color: white;
    transition: all ease-out 0.1s;
  }
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Error = styled.div`
  color: red;
  margin: 10px;
`;

const Register = () => {
  const uploadPhotoRef = useRef();
  const [selectedImg, setSelectedImg] = useState(unknown);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSignClick = (e) => {
    e.preventDefault();

    if (email.split('@')[1] !== 'o.cnu.ac.kr') {
      setError('Please input education email');
    } else {
      createUserWithEmailAndPassword(authService, email, password)
        .then(async (userCredential) => {
          // DB에 user 추가
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: name,
            role: 'user',
            rate: 0,
            evaluateNumber: 0,
            numberOfReport: 0,
            createdAt: serverTimestamp(),
          });

          // Auth에 name, photoURL 수정
          let fileURL = '';

          if (selectedImg !== unknown) {
            const fileRef = storageRef(storageService, `${userCredential.user.uid}/${v4()}`);
            const res = await uploadString(fileRef, selectedImg, 'data_url');
            fileURL = await getDownloadURL(res.ref);
          } else {
            fileURL = unknown;
          }

          updateProfile(authService.currentUser, {
            displayName: name,
            photoURL: fileURL,
          })
            .then(() => {
              console.log('update profile');
            })
            .catch((error) => {
              console.long(error);
            });

          set(ref(rt_db, 'users/' + userCredential.user.uid), {
            username: name,
            email: email,
            profile_picture: '',
          });

          alert('해당 이메일로 인증 메일을 보냈습니다.');
          window.location.replace('/');
        })
        .then(() => {
          // Send email
          const user = authService.currentUser;

          console.log(user);

          sendEmailVerification(user)
            .then(() => {
              console.log('이메일 전송');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };

  const onTextChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'name') setName(value);
  };

  const onImgChange = async (e) => {
    const {
      target: { files },
    } = e;

    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setSelectedImg(result);
    };
    reader.readAsDataURL(file);
  };

  const onPhotoClick = () => {
    uploadPhotoRef.current.click();
  };

  return (
    <RegisterWrap>
      <RegisterBox>
        <Logo>REGISTER</Logo>
        <PhotoSelect type='file' accept='image/*' ref={uploadPhotoRef} name='photo' onChange={onImgChange} />
        <Avata src={selectedImg} onClick={onPhotoClick} />
        <RegisterForm onSubmit={onSignClick}>
          <TextField placeholder={'이름'} id='name' name='name' onChange={onTextChange} required />
          <TextField placeholder={'이메일'} id='email' name='email' onChange={onTextChange} required />
          <TextField
            type='password'
            placeholder={'비밀번호'}
            id='password'
            name='password'
            onChange={onTextChange}
            required
          />

          <Error>{error}</Error>

          <Button type='submit' color='black' name='signup' value='회원가입' />
        </RegisterForm>
      </RegisterBox>
    </RegisterWrap>
  );
};

export default Register;
