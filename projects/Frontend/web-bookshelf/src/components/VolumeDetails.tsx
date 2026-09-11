import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Space, Tag, Typography } from "antd";
import type { Volume } from "../types/volumes";
import { getVolumeById } from "../api/volumes";
import Loading from "./Loading";
import Error from "./Error";
import BookCard from "./BookCard";
import List from "./List";

const { Text, Title } = Typography;

function getVolumeTitle(volume: Volume) {
    if (volume.title) return volume.title;
    if (volume.books.length > 0) return volume.books[0].title;
    return "Untitled";
}

export default function VolumeDetails() {
    const id = Number(useParams().id);
    const [volume, setVolume] = useState<Volume | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVolume = async () => {
            setLoading(true);
            try {
                const response = await getVolumeById(id);
                setVolume(response.data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchVolume();
    }, [id]);

    if (loading) return Loading();
    if (error) return <Error message={error} />;

    if (volume) {
        return (
            <>
                <Title level={2}>{getVolumeTitle(volume)}</Title>
                <Space orientation="vertical" size={4}>
                    {volume.isbn && <Text>ISBN: {volume.isbn}</Text>}
                    <Text>Pages: {volume.pages}</Text>
                    {volume.publisher && <Text>Publisher: {volume.publisher}</Text>}
                    {volume.publishedDate && <Text>Published: {volume.publishedDate}</Text>}
                    {volume.obtainedDate && <Text>Obtained: {volume.obtainedDate}</Text>}
                    <Tag color={volume.isOwned ? "green" : "red"}>
                        {volume.isOwned ? "Owned" : "Not Owned"}
                    </Tag>
                </Space>

                <Title level={4}>Books</Title>
                <List
                    items={volume.books}
                    renderCard={(book) => <BookCard book={book} />}
                />
            </>
        );
    }

    return null;
}