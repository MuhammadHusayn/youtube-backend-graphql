\c postgres
drop database if exists youtube;

create database youtube;
\c youtube

create extension pgcrypto;

create table users (
    user_id int generated always as identity primary key,
    username character varying(50) not null unique,
    password character varying(256) not null,
    user_img text not null,
    user_created_at timestamptz default current_timestamp,
    user_deleted_at timestamptz default null
);

create table videos (
    video_id int generated always as identity primary key,
    video_title character varying(50) not null,
    video_type character varying(50) not null,
    video_link text not null,
    user_id int not null references users (user_id),
    video_created_at timestamptz default current_timestamp,
    video_deleted_at timestamptz default null
);