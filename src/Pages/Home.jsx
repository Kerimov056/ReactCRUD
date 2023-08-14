import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCategories } from "../Services/CategoryService";
import { PostCategory } from "../Pages/PostCategory"
import { DeleteCategories } from "../Services/CategoryService";
import { useState } from "react";
import { Link } from "react-router-dom";




export function Home() {
  const [Color, SetColor] = useState("white");

  const navigate = useNavigate();

  const HandleBackgroundColor = () => SetColor("red");
  const HandleGoToCrud = () => navigate("/Crud");

  const queryCilnet = useQueryClient();

  const deleteMutation = useMutation(DeleteCategories, {
    onSuccess: () => {
      queryCilnet.invalidateQueries("Categoryies");
    },
    onError: (error) => {
      console.log("Error:", error);
    }
  });


  const handleDelete = (Id) => {
    deleteMutation.mutate(Id);
  }

  const onSuccess = (data) => {
    console.log("perform side effect after data fetching", data)
  }
  const onError = (error) => {
    console.log("perform side effect after encounting error", error)
  }

  const { isLoading, error, data } = useQuery(
    {
      queryKey: ["Categoryies"],
      queryFn: getCategories,
      staleTime: 0,
      onError,
      onSuccess,
    },
  );


  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error: {error.message}</h2>;

  if (error) return "An error has occured: " + error.message;
  return (
    <div style={{ backgroundColor: Color }}>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Categories</TableCaption>
          <Thead>
            <Tr>
              <Th>Category Name</Th>
              <Th>Desc</Th>
              <Th>Guid Id</Th>
              <Th>Delete</Th>
              <Th>Update</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data?.map((Category) => (
              <Tr key={Category.guid}>
                <Td>{Category.name}</Td>
                <Td>{Category.description}</Td>
                <Td>{Category.id}</Td>
                <Td><Button color={"red"} value={Category.id} onClick={()=>handleDelete(Category.id)}>Delete</Button></Td>
                <Td><Link to={`Update/${Category.id}`}><Button color={"orange"} value={Category.id}>Update</Button></Link></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <br />
      <Button onClick={HandleGoToCrud} m="10" colorScheme="whatsapp">
        Go to Crud
      </Button>
      <Button onClick={HandleBackgroundColor} m="10" colorScheme="red">
        change Color
      </Button>
    </div>
  );
}
