import { Container, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Menu = () =>{
    return (
        <Container centerContent>
                <Grid templateColumns='repeat(3, 1fr)' gap={10}>
                    <GridItem>
                        <Text>
                            <Link to="/sign_up">
                                SIGN UP
                            </Link>
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text>
                            <Link to="/sign_in">
                                SING IN
                            </Link>
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text>
                            <Link to="/profile">
                                PROFILE
                            </Link>
                        </Text>
                    </GridItem>
                </Grid>
        </Container>
    );
}