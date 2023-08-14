import React from 'react';
import { UpdateCategories, GetByIdCatagory } from "../Services/CategoryService";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import { Button, FormHelperText, FormLabel, Input, FormControl } from "@chakra-ui/react";


const Update = () => {


    const queryClinet = useQueryClient();
    const { Id } = useParams();
    const naviqate = useNavigate();

    const { data: catagory } = useQuery(["catagories", Id], () => GetByIdCatagory(Id));

    const updateMutatuion = useMutation(UpdateCategories, {
        onSuccess: () => {
            queryClinet.invalidateQueries(["catagories", Id]);
            naviqate('/')
        },
        onError: (error) => {
            console.log("This is Error", error);
        }
    })


    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        onSubmit: async (values) => {
            try {
                await updateMutatuion.mutate({ ...catagory, ...values })
            } catch (error) {
                console.log(error);
            }
        },
    });



    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>name</FormLabel>
                    <Input
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        type="text"
                    />
                    <FormLabel>desc</FormLabel>
                    <Input
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        type="text"
                    />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <br />
                <Button type="submit" onClick={formik.handleSubmit}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default Update;
