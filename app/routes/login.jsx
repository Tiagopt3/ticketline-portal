import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Form, Input, Button, Card, Row, Col, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../auth-context";
import { BASE_URL } from "../constants";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (values.username === "admin" && values.password === "123456") {
        login({ email: "admin", id: "admin-user" });
        message.success("Login successful!");
        navigate("/");
      } else {
        message.error("Credenciais inválidas.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#e9e9e9", padding: "1rem" }}>
      <Row gutter={[16, 16]} style={{ width: "100%", maxWidth: "400px" }}>
        <Col xs={24}>
          <Card
            style={{
              borderTop: "4px solid #d70000",
              boxShadow: "0 1px 0 rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <img 
                src={`${BASE_URL}images/ticketlineLogo.png`}
                alt="TicketLine Logo" 
                style={{ width: "50%", margin: "0 auto 2rem" }} 
              />
              <h1 style={{ fontSize: "1.25rem", fontWeight: "800", margin: "0.2rem 0", letterSpacing: "0.04em" }}>
                AREA DE CLIENTE
              </h1>
              <p style={{ fontSize: "0.82rem", color: "#7a7a7a", margin: "0.5rem 0 0" }}>
                Aceda a sua conta para gerir bilhetes e faturas
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="USERNAME"
                name="username"
                labelCol={{ style: { fontSize: "0.69rem", fontWeight: "700", letterSpacing: "0.08em" } }}
                rules={[{ required: true, message: "Por favor insira o seu username" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="admin"
                  size="large"
                  autoComplete="username"
                  style={{ minHeight: "44px" }}
                />
              </Form.Item>

              <Form.Item
                label="PASSWORD"
                name="password"
                labelCol={{ style: { fontSize: "0.69rem", fontWeight: "700", letterSpacing: "0.08em" } }}
                rules={[{ required: true, message: "Por favor insira a sua password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="123456"
                  size="large"
                  autoComplete="current-password"
                  style={{ minHeight: "44px" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  style={{
                    minHeight: "44px",
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    background: "#d70000",
                    borderColor: "#d70000",
                  }}
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>

            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e2e2e2", textAlign: "center" }}>
              <div style={{ fontSize: "0.78rem", display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <Link to="/forgot-password" style={{ color: "#d70000", textDecoration: "none" }}>
                  Esqueci a password
                </Link>
                <span>|</span>
                <Link to="/register" style={{ color: "#d70000", textDecoration: "none" }}>
                  Criar conta
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
