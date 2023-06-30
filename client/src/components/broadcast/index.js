"use client";
import { useEffect, useRef } from "react";

const useSocket = () => {
  const socketCreated = useRef(false);
  useEffect(() => {
    if (!socketCreated.current) {
      const socketInitializer = async () => {
        console.log(await fetch("/socket"))
      };
      try {
        socketInitializer();
        socketCreated.current = true;
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
};

export default useSocket;
