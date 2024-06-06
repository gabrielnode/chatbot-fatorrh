"use client";
import styled from "styled-components";

export const LikeButton = styled.button`
    margin-right: 10px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    padding: 5px 10px;
    transition: background 0.3s ease, color 0.3s ease;

    &:hover {
      background: #1ce11c;
    }
`;

export const DislikeButton = styled.button`
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    padding: 5px 10px;
    transition: background 0.3s ease, color 0.3s ease;

    &:hover {
      background: #d91825;
      color: red;
    }
`;