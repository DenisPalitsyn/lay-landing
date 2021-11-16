import React, {useEffect, useState} from 'react';
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {format} from "date-fns";

const Dashboard = () => {
    const firestore = getFirestore();
    const usersCollection = collection(firestore, 'users');

    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocs(usersCollection);
                const usersData = [];

                data.forEach((doc) => {
                    usersData.push(doc.data());
                });
                return usersData.sort((a, b) => b.date - a.date);
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchData().then(setUsers);
    }, [usersCollection])

    return (
        <div style={{margin: '10vh auto', width: 700}}>
            {users ? <UsersTable users={users}/> : <p>Loading...</p>}
        </div>
    );
}

export default Dashboard;

const UsersTable = ({users}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (!users.length) {
        return (
            <p>No users yet</p>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date of creation</TableCell>
                        <TableCell align="center">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : users
                    ).map((user, index) => (
                        <TableRow key={user.date + index}>
                            <TableCell component="th" scope="row">{format(user.date, 'dd.MM.yyyy')}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}