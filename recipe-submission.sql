PGDMP                         {            recipes    15.3    15.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    32917    recipes    DATABASE     �   CREATE DATABASE recipes WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE recipes;
                postgres    false            �            1259    32919    recipes    TABLE     �   CREATE TABLE public.recipes (
    id integer NOT NULL,
    name character varying(255),
    title character varying(255),
    ingredients text,
    contact_number character varying(20),
    description text
);
    DROP TABLE public.recipes;
       public         heap    postgres    false            �            1259    32918    recipes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.recipes_id_seq;
       public          postgres    false    215            �           0    0    recipes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;
          public          postgres    false    214            d           2604    32922 
   recipes id    DEFAULT     h   ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);
 9   ALTER TABLE public.recipes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �          0    32919    recipes 
   TABLE DATA           \   COPY public.recipes (id, name, title, ingredients, contact_number, description) FROM stdin;
    public          postgres    false    215   �
       �           0    0    recipes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.recipes_id_seq', 1, false);
          public          postgres    false    214            f           2606    32926    recipes recipes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public            postgres    false    215            �      x������ � �     