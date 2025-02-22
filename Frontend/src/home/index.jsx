import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight, VideoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Home() {
  const text = "Build Your Resume With AI";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
        setSpeed((prev) => Math.max(prev - 5, 30));
      } else if (isDeleting && index > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
        setSpeed((prev) => Math.max(prev - 5, 20));
      } else {
        setTimeout(() => {
          setIsDeleting(!isDeleting);
          setSpeed(70);
        }, 300);
      }
    };

    const timeout = setTimeout(handleTyping, speed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting, speed, text]);

  return (
    <div>
      <Header />
      <div className='mx-10 md:mx-20 lg:mx-36 flex flex-col justify-center items-center mt-10'>
        <h2 className='text-5xl font-bold'>
          {displayedText.split(" ").slice(0, 2).join(" ")}
          <span className='text-purple-500'>
            {" " + displayedText.split(" ").slice(2).join(" ")}
          </span>
          <span className="animate-blink">|</span>
        </h2>
        <p className='text-gray-500'>Effortlessly Craft a Standout Resume with our AI-Powered Builder</p>
      </div>

      <div className='flex justify-center mt-5 gap-10 mx-10'>
        <Link to={'/dashboard'}>
          <Button className='rounded-xl text-white'>Get Started <ArrowRight /></Button>
        </Link>
        <Button variant="outline" className='rounded-xl'><VideoIcon /> Watch Video</Button>
      </div>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold text-center text-green-500'>Our Customers Have Been Hired At!</h2>
        <div className='flex justify-center bg-slate-200 mt-4 mx-10 shadow-md rounded-xl'>
          <img src="/HomeImages/apple.svg" alt="Apple" />
          <img src="/HomeImages/accenture.svg" alt="Accenture" />
          <img src="/HomeImages/amazon.svg" alt="Amazon" />
        </div>
      </div>

      <div className='mx-10 flex flex-col md:flex-row justify-center items-center gap-10'>
        <img src="/HomeImages/image1.webp" alt="Resume Builder" />
        <div>
          <p className='text-5xl font-bold'>AI Resume Builder <span className='text-red-500'>(Fast, Easy & Free to Use)</span></p>
          <p className='mt-5 text-gray-500'>
            Land your next job with one of the best AI resume builders online. Work from your computer or phone with dozens of recruiter-approved templates and add ready-to-use skills and phrases in one click. Millions have trusted our resume maker — and it’s free to use!
          </p>
        </div>
      </div>

      <div className='flex justify-center mx-20 gap-10 mt-10'>
        <div>
          <img src="/HomeImages/img1.png" alt="Customize Theme" />
          <p className='text-2xl font-semibold mt-1'>Choose the desired theme color</p>
        </div>
        <div>
          <img src="/HomeImages/img2.png" alt="Add Skills" />
          <p className='text-2xl font-semibold mt-1'>Add skills and bullet points in one click</p>
        </div>
        <div>
          <img src="/HomeImages/img3.png" alt="Finish Resume" />
          <p className='text-2xl font-semibold mt-1'>Finish your resume in minutes</p>
        </div>
        <div>
          <img src="/HomeImages/img4.png" alt="Download Options" />
          <p className='text-2xl font-semibold mt-1'>Download in Word, PDF, and more</p>
        </div>
      </div>

      <div className='w-full bg-slate-200 mt-10'>
        <p className='text-center my-2'>© 2025 All Rights Reserved, Shahid®</p>
        <p className='text-center my-2'>Privacy policy | Terms</p>
      </div>
    </div>
  );
}

export default Home;
