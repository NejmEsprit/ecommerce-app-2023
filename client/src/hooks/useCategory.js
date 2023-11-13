import { useState,useEffect } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories,setCategories] =useState([])
    //get category
    const getCategorie =async ()=>{
        try {
          const {data}=await axios.get(`/api/category/all-category`)
          setCategories(data?.catogories)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategorie()
    },[])
    return categories;
}