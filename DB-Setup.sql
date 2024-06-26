toc.dat                                                                                             0000600 0004000 0002000 00000016660 14620265374 0014461 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   4                    |           JLT    16.0 (Debian 16.0-1.pgdg120+1)    16.1     2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         5           1262    24577    JLT    DATABASE     p   CREATE DATABASE "JLT" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE "JLT";
                postgres    false         �            1259    32771    fuel    TABLE     �   CREATE TABLE public.fuel (
    id integer NOT NULL,
    truck_id integer NOT NULL,
    fuel_date date NOT NULL,
    fuel_gallons numeric(10,2) NOT NULL,
    fuel_cost numeric(10,2) NOT NULL,
    per_gallon_cost numeric,
    mileage numeric(10,2)
);
    DROP TABLE public.fuel;
       public         heap    postgres    false         �            1259    32770    fuel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fuel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.fuel_id_seq;
       public          postgres    false    217         6           0    0    fuel_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.fuel_id_seq OWNED BY public.fuel.id;
          public          postgres    false    216         �            1259    32789    jobruns    TABLE     �  CREATE TABLE public.jobruns (
    id integer NOT NULL,
    job_type text,
    truck_id integer,
    driver_id text,
    status text,
    starting_mileage numeric(25,2),
    ending_mileage numeric(25,2),
    po_number text,
    pickup_location character varying(255),
    delivery_location character varying(255),
    job_pay numeric(25,2),
    notes character varying(255),
    complete_time timestamp with time zone,
    job_date date
);
    DROP TABLE public.jobruns;
       public         heap    postgres    false         �            1259    32788    jobruns_id_seq    SEQUENCE     �   CREATE SEQUENCE public.jobruns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.jobruns_id_seq;
       public          postgres    false    221         7           0    0    jobruns_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.jobruns_id_seq OWNED BY public.jobruns.id;
          public          postgres    false    220         �            1259    32780    maintenance    TABLE       CREATE TABLE public.maintenance (
    id integer NOT NULL,
    truck_id integer NOT NULL,
    maintenance_date date NOT NULL,
    maintenance_type text NOT NULL,
    maintenance_cost numeric(10,2) NOT NULL,
    maintenance_mileage numeric(10,2),
    notes character varying(255)
);
    DROP TABLE public.maintenance;
       public         heap    postgres    false         �            1259    32779    maintenance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.maintenance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.maintenance_id_seq;
       public          postgres    false    219         8           0    0    maintenance_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.maintenance_id_seq OWNED BY public.maintenance.id;
          public          postgres    false    218         �            1259    24578    users    TABLE     l   CREATE TABLE public.users (
    username character varying(50),
    password_hash character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false         �           2604    32774    fuel id    DEFAULT     b   ALTER TABLE ONLY public.fuel ALTER COLUMN id SET DEFAULT nextval('public.fuel_id_seq'::regclass);
 6   ALTER TABLE public.fuel ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217         �           2604    32792 
   jobruns id    DEFAULT     h   ALTER TABLE ONLY public.jobruns ALTER COLUMN id SET DEFAULT nextval('public.jobruns_id_seq'::regclass);
 9   ALTER TABLE public.jobruns ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221         �           2604    32783    maintenance id    DEFAULT     p   ALTER TABLE ONLY public.maintenance ALTER COLUMN id SET DEFAULT nextval('public.maintenance_id_seq'::regclass);
 =   ALTER TABLE public.maintenance ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219         +          0    32771    fuel 
   TABLE DATA           j   COPY public.fuel (id, truck_id, fuel_date, fuel_gallons, fuel_cost, per_gallon_cost, mileage) FROM stdin;
    public          postgres    false    217       3371.dat /          0    32789    jobruns 
   TABLE DATA           �   COPY public.jobruns (id, job_type, truck_id, driver_id, status, starting_mileage, ending_mileage, po_number, pickup_location, delivery_location, job_pay, notes, complete_time, job_date) FROM stdin;
    public          postgres    false    221       3375.dat -          0    32780    maintenance 
   TABLE DATA           �   COPY public.maintenance (id, truck_id, maintenance_date, maintenance_type, maintenance_cost, maintenance_mileage, notes) FROM stdin;
    public          postgres    false    219       3373.dat )          0    24578    users 
   TABLE DATA           8   COPY public.users (username, password_hash) FROM stdin;
    public          postgres    false    215       3369.dat 9           0    0    fuel_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.fuel_id_seq', 1, false);
          public          postgres    false    216         :           0    0    jobruns_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.jobruns_id_seq', 47, true);
          public          postgres    false    220         ;           0    0    maintenance_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.maintenance_id_seq', 1, false);
          public          postgres    false    218         �           2606    32778    fuel fuel_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.fuel
    ADD CONSTRAINT fuel_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.fuel DROP CONSTRAINT fuel_pkey;
       public            postgres    false    217         �           2606    32796    jobruns jobruns_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.jobruns
    ADD CONSTRAINT jobruns_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.jobruns DROP CONSTRAINT jobruns_pkey;
       public            postgres    false    221         �           2606    32787    maintenance maintenance_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.maintenance DROP CONSTRAINT maintenance_pkey;
       public            postgres    false    219                                                                                        3371.dat                                                                                            0000600 0004000 0002000 00000000005 14620265374 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3375.dat                                                                                            0000600 0004000 0002000 00000006226 14620265374 0014272 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        10	Delivery	123	JD123	CompleteIn Progress	50000.50	50250.75	123456	123 Main St, City	456 Elm St, Town	500.00	Handle with care	\N	2024-04-14
11	Delivery	123	JD123	Complete	50000.50	50250.75	123456	123 Main St, City	456 Elm St, Town	500.00	Handle with care	2024-05-09 14:04:50.281+00	2024-04-14
12	Delivery	123	JD123	In Progress	50000.50	50250.75	123456	123 Main St, City	456 Elm St, Town	500.00	Handle with care	\N	2024-04-14
13	help	1	JL	In Progress	22334.00	23445.00	123	dddd	ddddd	400.00	ssssss	\N	2024-05-03
14	help	1	JL	In Progress	22334.00	23445.00	123	dddd	ddddd	400.00	ssssss	\N	2024-05-03
15	55555	1	JL	In Progress	22334.00	23445.00	123	dddd	ddddd	400.00	fffffffffffffffffffffffffffffff	\N	2024-05-10
16	55555	1	JL	In Progress	22334.00	23445.00	123	dddd	ddddd	400.00	fffffffffffffffffffffffffffffff	\N	2024-05-10
17	55555	1	JL	In Progress	22334.00	23445.00	123	dddd	ddddd	400.00	gggg	\N	2024-05-09
18	55555	1	JL	In Progress	22334.00	23445.00	123	dddd	ddddd	400.00	sssss	\N	2024-05-08
19	55555	1	JL	In Progress	22334.00	23445.00	123	dddd	ddddd	400.00	sssss	\N	2024-05-08
20	55555	1	JL	In Progress	555.00	23445.00	123	dddd	ddddd	400.00	ssss	\N	2024-05-04
21	55555	1	JL	In Progress	555.00	23445.00	123	dddd	ddddd	400.00	ssss	\N	2024-05-04
22	55555	1	JL	In Progress	22334.00	555.00	123	555	555	400.00	s	\N	2024-05-04
23	55555	1	JL	In Progress	22334.00	23445.00	123	dddd	ddddd	400.00	sssssssssssssssssssssssssssssssss	\N	2024-05-07
24	Haul	1	JL	In Progress	23563.00	24563.00	PO123456	eee	eee	400.00	dddddd	\N	2024-05-08
25	5	1	JL	In Progress	5.00	5.00	5	5	5	5.00	5	\N	2024-05-09
26	111	1	JL	In Progress	111.00	111.00	11111	111	111	111.00	111	\N	2024-05-08
27	1	1	JL	In Progress	1.00	1.00	1	1	1	1.00	qqqq	\N	2024-05-10
28	1	1	JL	In Progress	1.00	1.00	po	1	1	1.00	1	\N	2024-05-09
29	1	1	JL	In Progress	11.00	1.00	PO182672633	1	1	1.00	1	\N	2024-05-10
30	1	1	JL	In Progress	1.00	1.00	123321	1	1	1.00	1	\N	2024-05-17
31	qqqqq	1	JL	In Progress	22.00	22.00	qqqqqq	22	22	22.00	22	\N	2024-05-17
32	9999	1	JL	In Progress	9999.00	999.00	99999	999	999	999.00	999	\N	2024-05-08
33	88	1	JL	In Progress	88.00	88.00	88	88	88	88.00	88	\N	2024-05-16
34	Scrap	1	JL	In Progress	22345.00	45678.00	PO9827373	lakewood	Jackson	500.33	blahhhhhh	\N	2024-06-06
35	Scrap	1	JL	Complete	22598.00	45369.00	PO9999999999	lakewood	new jersey	543.00	bhallskdjejudjdndjdje	2024-05-10 16:42:21.966+00	2024-06-03
36	1	1	JL	In Progress	1.00	1.00	1	1	1	1.00	1	\N	2024-05-10
37	44	1	JL	In Progress	44.00	44.00	44	44	44	44.00	44	\N	2024-05-04
38	Scrap	1	JL	In Progress	23589.00	62356.00	po52626262	LAwewood	shsnekss	456.32	sssss	\N	2024-05-09
39	1	1	JL	In Progress	1.00	1.00	1	1	1	1.00	1	\N	2024-05-03
40	1	1	JL	In Progress	1.00	1.00		1	1	1.00	1	\N	2024-05-04
41	1	1	JL	In Progress	1.00	1.00		1	1	1.00	1	\N	2024-05-04
42	1	1	JL	In Progress	1.00	\N	\N	9	1	\N	\N	\N	2024-05-01
43	555	1	JL	In Progress	555.00	555.00	55555	555	555	\N	555	\N	2024-05-03
44	999	1	JL	In Progress	999.00	999.00	555999	999	999	\N	\N	\N	2024-05-16
45	789	1	JL	In Progress	789.00	\N	789	789	789	\N	789	\N	2024-05-04
46	6	1	JL	In Progress	666666666666666.00	666666666666.00	\N	66	66	66666666666666.00	66	\N	2024-05-04
47	dd	1	JL	In Progress	1168976.00	\N	ddd	dd	dd	\N	\N	\N	2024-05-21
\.


                                                                                                                                                                                                                                                                                                                                                                          3373.dat                                                                                            0000600 0004000 0002000 00000000005 14620265374 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3369.dat                                                                                            0000600 0004000 0002000 00000000106 14620265374 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        jkl	$2b$10$JqSI7ulFnxVFnQvWGs4OKOTUJihtw6H.QioyRjaf40q4zGQU86YIG
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                          restore.sql                                                                                         0000600 0004000 0002000 00000015657 14620265374 0015413 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "JLT";
--
-- Name: JLT; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "JLT" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "JLT" OWNER TO postgres;

\connect "JLT"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: fuel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fuel (
    id integer NOT NULL,
    truck_id integer NOT NULL,
    fuel_date date NOT NULL,
    fuel_gallons numeric(10,2) NOT NULL,
    fuel_cost numeric(10,2) NOT NULL,
    per_gallon_cost numeric,
    mileage numeric(10,2)
);


ALTER TABLE public.fuel OWNER TO postgres;

--
-- Name: fuel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fuel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fuel_id_seq OWNER TO postgres;

--
-- Name: fuel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fuel_id_seq OWNED BY public.fuel.id;


--
-- Name: jobruns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobruns (
    id integer NOT NULL,
    job_type text,
    truck_id integer,
    driver_id text,
    status text,
    starting_mileage numeric(25,2),
    ending_mileage numeric(25,2),
    po_number text,
    pickup_location character varying(255),
    delivery_location character varying(255),
    job_pay numeric(25,2),
    notes character varying(255),
    complete_time timestamp with time zone,
    job_date date
);


ALTER TABLE public.jobruns OWNER TO postgres;

--
-- Name: jobruns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobruns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobruns_id_seq OWNER TO postgres;

--
-- Name: jobruns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobruns_id_seq OWNED BY public.jobruns.id;


--
-- Name: maintenance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maintenance (
    id integer NOT NULL,
    truck_id integer NOT NULL,
    maintenance_date date NOT NULL,
    maintenance_type text NOT NULL,
    maintenance_cost numeric(10,2) NOT NULL,
    maintenance_mileage numeric(10,2),
    notes character varying(255)
);


ALTER TABLE public.maintenance OWNER TO postgres;

--
-- Name: maintenance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.maintenance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.maintenance_id_seq OWNER TO postgres;

--
-- Name: maintenance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.maintenance_id_seq OWNED BY public.maintenance.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying(50),
    password_hash character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: fuel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel ALTER COLUMN id SET DEFAULT nextval('public.fuel_id_seq'::regclass);


--
-- Name: jobruns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobruns ALTER COLUMN id SET DEFAULT nextval('public.jobruns_id_seq'::regclass);


--
-- Name: maintenance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenance ALTER COLUMN id SET DEFAULT nextval('public.maintenance_id_seq'::regclass);


--
-- Data for Name: fuel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fuel (id, truck_id, fuel_date, fuel_gallons, fuel_cost, per_gallon_cost, mileage) FROM stdin;
\.
COPY public.fuel (id, truck_id, fuel_date, fuel_gallons, fuel_cost, per_gallon_cost, mileage) FROM '$$PATH$$/3371.dat';

--
-- Data for Name: jobruns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobruns (id, job_type, truck_id, driver_id, status, starting_mileage, ending_mileage, po_number, pickup_location, delivery_location, job_pay, notes, complete_time, job_date) FROM stdin;
\.
COPY public.jobruns (id, job_type, truck_id, driver_id, status, starting_mileage, ending_mileage, po_number, pickup_location, delivery_location, job_pay, notes, complete_time, job_date) FROM '$$PATH$$/3375.dat';

--
-- Data for Name: maintenance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.maintenance (id, truck_id, maintenance_date, maintenance_type, maintenance_cost, maintenance_mileage, notes) FROM stdin;
\.
COPY public.maintenance (id, truck_id, maintenance_date, maintenance_type, maintenance_cost, maintenance_mileage, notes) FROM '$$PATH$$/3373.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (username, password_hash) FROM stdin;
\.
COPY public.users (username, password_hash) FROM '$$PATH$$/3369.dat';

--
-- Name: fuel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fuel_id_seq', 1, false);


--
-- Name: jobruns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobruns_id_seq', 47, true);


--
-- Name: maintenance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.maintenance_id_seq', 1, false);


--
-- Name: fuel fuel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuel
    ADD CONSTRAINT fuel_pkey PRIMARY KEY (id);


--
-- Name: jobruns jobruns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobruns
    ADD CONSTRAINT jobruns_pkey PRIMARY KEY (id);


--
-- Name: maintenance maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 