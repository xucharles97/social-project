import React, { useState, useEffect } from "react";
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../constants";
import SearchBar from "./SearchBar";
import { Tabs, message, Row, Col } from "antd";
import axios from "axios";
import PhotoGallery from "./PhotoGallery";

const { TabPane } = Tabs;

function Collection(props) {
  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    keyword: "",
  });

  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("image");

  const handleSearch = (option) => {
    setSearchOption(option);
  };

  useEffect(() => {
    fetchPosts(searchOption);
  }, [searchOption]);

  const fetchPosts = (option) => {
    const { type, keyword } = option;
    let url = "";

    if (type === SEARCH_KEY.all) {
      url = `${BASE_URL}/search`;
    } else if (type === SEARCH_KEY.user) {
      url = `${BASE_URL}/search?user=${keyword}`;
    } else {
      url = `${BASE_URL}/search?keywords=${keyword}`;
    }

    const opt = {
      method: "GET",
      url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };

    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
      })
      .catch((err) => {
        message.error("Fetch posts failed!");
        console.log("fetch posts failed: ", err.message);
      });
  };

  const renderPosts = (type) => {
    if (!posts || posts.length === 0) {
      return <div>No posts</div>;
    }

    let filtered;

    if (type === "image") {
      filtered = posts.filter((post) => {
        return post.type === "image";
      });

      if (!filtered || filtered.length === 0) {
        return <div>no image</div>;
      }

      const imageArr = filtered.map((image) => {
        return {
          postId: image.id,
          src: image.url,
          user: image.user,
          caption: image.message,
          thumbnail: image.url,
          thumdnailWidth: 300,
          thumbnailHeight: 200,
        };
      });

      return <PhotoGallery images={imageArr} />;
    } else if (type === "video") {
      filtered = posts.filter((post) => {
        return post.type === "image";
      });

      if (!filtered || filtered.length === 0) {
        return <div>no image</div>;
      }

      return (
        <Row>
          {filtered.map((post) => {
            return (
              <Col span={24} key={post.url}>
                <video src={post.url} controls={true} className="video-block" />
              </Col>
            );
          })}
        </Row>
      );
    }
  };

  return (
    <div className="home">
      <SearchBar handleSearch={handleSearch} />
      <div className="display">
        <Tabs
          onChange={(key) => setActiveTab(key)}
          defaultActiveKey="image"
          activeKey={activeTab}
        >
          <TabPane tab="Images" key="image">
            {renderPosts("image")}
          </TabPane>
          <TabPane tab="Videos" key="video">
            {renderPosts("video")}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Collection;
