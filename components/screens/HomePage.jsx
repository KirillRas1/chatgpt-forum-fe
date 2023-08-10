import { useState } from 'react';
import GoogleLoginButton from '../GoogleLogin';
import { BotMessage, Message, UserMessage } from '../styles';
import axios from 'axios';
import Messages from './Threads';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <Link href={'/posts/'}>
        <h3>Posts</h3>
      </Link>
      <GoogleLoginButton />
    </div>
  );
} //test
