import { Container, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {GrNotification} from "react-icons/gr";
export const Menu = ({messages}) =>{
    return (
        <Container centerContent mt={10} mb={20}>
                <Grid templateColumns='repeat(7, auto)' gap={10}>
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
                            <Link to="/messenger">
                                Messenger
                                <GrNotification/> {messages}
                            </Link>
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Text>
                            <Link to="/profile-update">
                                UPDATE PROFILE
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
                    <GridItem>
                        <Text>
                            <Link to="/feeds">
                               FEEDS
                            </Link>
                        </Text>
                    </GridItem>
                </Grid>
        </Container>
    );
}