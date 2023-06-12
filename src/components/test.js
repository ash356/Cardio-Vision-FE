useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/flist/");
    const data = await response.json();
    const modifiedData = data.map((item) => ({
      ...item,
      firstName: item.first_name,
      lastName: item.last_name,
      HighBloodPressure: item.HighBP,
      Cholesterol: item.HighChol,
      result: item.result,
      submitted_time: item.submitted_time,
    }));
    setSearchArray(modifiedData);
    setFilteredResults(
      modifiedData.sort((a, b) =>
        b.submitted_time.localeCompare(a.submitted_time)
      )
    );
  };

  // fetchData();
}, []);
return authService.isAuthenticated() ? (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="dashboard" id={theme}>
      <Sidebar />
      <div className="containe">
        <div className="row">
          <div className="image-container">
            <img src={Img} alt="img1" className="image" />
          </div>
          <div className="overlay">
            <h2>Hi {`${profile.firstName} ${profile.lastName}`} !</h2>
            <h6 className="par">Elevate Your Cardiovascular Health Today</h6>
            <div className="button-container">
              <Link to="/form">Start</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ThemeContext.Provider>
) : null;