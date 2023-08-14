import React from 'react';
import { UpdateCategories, GetByIdCatagory } from "../Services/CategoryService";
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { Button, FormHelperText, FormLabel, Input, FormControl } from "@chakra-ui/react";

const Update = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: category } = useQuery(["categories", id], () => GetByIdCatagory(id));
    const updateMutation = useMutation(updatedData => UpdateCategories(id, updatedData), {
        onSuccess: () => {
            queryClient.invalidateQueries(["categories", id]);
            navigate('/');
        },
        onError: (error) => {
            console.log("Error updating category:", error);
        }
    });

    const formik = useFormik({
        initialValues: category?.data || {
            name: "",
            description: "",
        },
        onSubmit: async (values) => {
            try {
                await updateMutation.mutateAsync(values);
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
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default Update;
