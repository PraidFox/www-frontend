export const ErrorPage = () => {
    // const error = useRouteError();

    return (
        <div id="error-page" style={{textAlign: "center"}}>
            <h1>Упс!</h1>
            <p>Кажется для этого пути еще нет страницы</p>
            {/*<p>*/}
            {/*    <i>{error.statusText || error.message}</i>*/}
            {/*</p>*/}
        </div>
    );
}