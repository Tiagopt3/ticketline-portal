import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Form, Input, Button, Card, Row, Col, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth } from "../auth-context";

export function meta() {
  return [
    { title: "Register - TicketLine Portal" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function Register() {
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
      // Validate passwords match
      if (values.password !== values.confirmPassword) {
        message.error("Passwords do not match.");
        return;
      }

      if (values.password.length < 6) {
        message.error("Password must be at least 6 characters.");
        return;
      }

      message.success("Account created successfully! Logging you in...");
      
      setTimeout(() => {
        login({ email: values.email, id: `user-${Date.now()}` });
        navigate("/");
      }, 1500);
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
                src="/images/ticketlineLogo.png" 
                alt="TicketLine Logo" 
                style={{ width: "50%", margin: "0 auto 2rem" }} 
              />
              <h1 style={{ fontSize: "1.25rem", fontWeight: "800", margin: "0.2rem 0", letterSpacing: "0.04em" }}>
                CRIAR CONTA
              </h1>
              <p style={{ fontSize: "0.82rem", color: "#7a7a7a", margin: "0.5rem 0 0" }}>
                Registe-se para gerir bilhetes e faturas
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="EMAIL"
                name="email"
                labelCol={{ style: { fontSize: "0.69rem", fontWeight: "700", letterSpacing: "0.08em" } }}
                rules={[
                  { required: true, message: "Por favor insira o seu email" },
                  { type: "email", message: "Email inválido" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="seu@email.com"
                  size="large"
                  autoComplete="email"
                  style={{ minHeight: "44px" }}
                />
              </Form.Item>

              <Form.Item
                label="USERNAME"
                name="username"
                labelCol={{ style: { fontSize: "0.69rem", fontWeight: "700", letterSpacing: "0.08em" } }}
                rules={[{ required: true, message: "Por favor escolha um username" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Choose a username"
                  size="large"
                  autoComplete="username"
                  style={{ minHeight: "44px" }}
                />
              </Form.Item>

              <Form.Item
                label="PASSWORD"
                name="password"
                labelCol={{ style: { fontSize: "0.69rem", fontWeight: "700", letterSpacing: "0.08em" } }}
                rules={[{ required: true, message: "Por favor insira uma password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Minimum 6 characters"
                  size="large"
                  autoComplete="new-password"
                  style={{ minHeight: "44px" }}
                />
              </Form.Item>

              <Form.Item
                label="CONFIRM PASSWORD"
                name="confirmPassword"
                labelCol={{ style: { fontSize: "0.69rem", fontWeight: "700", letterSpacing: "0.08em" } }}
                rules={[{ required: true, message: "Por favor confirme a sua password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm your password"
                  size="large"
                  autoComplete="new-password"
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
                  CREATE ACCOUNT
                </Button>
              </Form.Item>
            </Form>

            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e2e2e2", textAlign: "center" }}>
              <div style={{ fontSize: "0.78rem", marginBottom: "0.5rem" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#d70000", textDecoration: "none" }}>
                  Login here
                </Link>
              </div>
              <div style={{ fontSize: "0.78rem" }}>
                <Link to="/forgot-password" style={{ color: "#d70000", textDecoration: "none" }}>
                  Forgot your password?
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
