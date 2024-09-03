import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import JobPage, {jobLoader} from "./pages/JobPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";
import EditJobPage from "./pages/EditJobPage.jsx";


const App = () => {
    // add
    async function addJob(newJob) {
        const res = await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob)
        });
    }

    // update
    async function updateJob(job) {
        const res = await fetch(`/api/jobs/${job.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(job)
        });
    }

    // delete
    async function deleteJob(id) {
        const res = await fetch(`/api/jobs/${id}`, {
            method: 'DELETE',
        });
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='/jobs' element={<JobsPage/>}/>
                <Route path='/add-job' element={<AddJobPage addSubmitJob={addJob}/>}/>
                <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
                <Route path='/jobs/:id' element={<JobPage deleJob={deleteJob}/>} loader={jobLoader}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        )
    )

    return <RouterProvider router={router}/>
};

export default App;