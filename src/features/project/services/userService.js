export const getAllUsers = async () => {
    const res = await fetch("https://pms-l909.onrender.com/api/v1/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    const data = await res.json();
    console.log("Users fetched API response:", data);

    // Extract users array from different possible response formats
    let users = [];
    
    if (Array.isArray(data)) {
        users = data;  // Direct array
    } else if (data && Array.isArray(data.users)) {
        users = data.users;  // data.users format
    } else if (data && Array.isArray(data.data)) {
        users = data.data;  // data.data format
    } else if (data && data.user && Array.isArray(data.user)) {
        users = data.user;  // data.user format
    }

    // Return in the expected format
    return {
        success: res.ok,
        data: users,  // Return the extracted array
        message: data.message || null
    };
};  

    