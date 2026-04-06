import streamlit as st
import requests

st.title("WealthLens Streamlit")

query = st.text_input("Ask WealthLens")
deep_search = st.checkbox("Deep search")

if st.button("Send"):
    response = requests.post(
        "http://localhost:8000/query",
        json={"query": query, "deep_search": deep_search},
        timeout=30,
    )
    data = response.json()
    st.write(data["answer"]["answer"])
    st.json(data)