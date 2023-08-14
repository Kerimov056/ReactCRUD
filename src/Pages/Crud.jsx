import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, FormHelperText, FormLabel, Input, FormControl } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query"; // Import useMutation and useQueryClient
import { PostCategories } from "../Services/CategoryService";

export default function Crud() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Initialize query client

  const HandleGoToCrud = () => {
    navigate("/");
  };

  const mutation = useMutation(PostCategories, {
    onSuccess: () => {
      // Invalidate and refetch the category list query after successful mutation
      queryClient.invalidateQueries("Categoryies");
      navigate("/"); // Redirect back to home
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      // Call the mutation function to create a new category
      try {
        await mutation.mutateAsync(values); // Pass the form values to the mutation
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
      <Button onClick={HandleGoToCrud} m="5" colorScheme="whatsapp">
        Get Back to Home
      </Button>
    </div>
  );
}
