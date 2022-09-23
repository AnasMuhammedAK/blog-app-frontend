import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section className="mt-96 ">
            <h1 className="text-center text-3xl text-red-500">Unauthorized</h1>
            <br />
            <p className="text-center text-xl">You do not have access to the requested page.</p>
            <div className="flexGrow flex items-center justify-center">
                <button className=" mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized